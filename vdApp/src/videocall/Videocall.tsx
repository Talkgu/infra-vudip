import { LEAVE_URL, RTC_CONFIG, SIGNALING_SERVER_URL } from "../config"
import { getAudioLabel, getUserId, getVideoLabel } from "../helpers"
import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"

import "./Videocall.css"
  
export default function VideoCall(
    { RoomId } : { RoomId: string }
) {
    const localVideoRef = useRef<HTMLVideoElement | null>(null)
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null)
    const localStreamRef = useRef<MediaStream | null>(null)
    
    const listenersAttachedRef = useRef(false)

    const hasAudioRef = useRef(true)
    const hasVideoRef = useRef(true)

    const [audioLabelSrc, setAudioLabelSrc] = useState(getAudioLabel(hasAudioRef.current))
    const [videoLabelSrc, setVideoLabelSrc] = useState(getVideoLabel(hasAudioRef.current))

    const pc = useRef(new RTCPeerConnection(RTC_CONFIG))
    const sc = useRef(io(SIGNALING_SERVER_URL, {
        query: { 
            roomId: RoomId, 
        }, transports: ["websocket"]
    }))

    const setupLocalMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: { 
                    width: { ideal: 640 }, 
                    height: { ideal: 360 } 
                }
            })

            localStreamRef.current = stream
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream
            }

            stream.getTracks().forEach(track => {
                pc.current.addTrack(track, stream)
            })
        } catch {
            console.error("No media devices, do something")
        }
    }

    const toggleAudio = () => {
        hasAudioRef.current = !hasAudioRef.current
        setAudioLabelSrc(getAudioLabel(hasAudioRef.current))

        if (!localStreamRef.current) {
            return
        }

        localStreamRef.current.getAudioTracks().forEach(track => {
            track.enabled = hasAudioRef.current
        })
    }
    
   const toggleVideo = () => {
        hasVideoRef.current = !hasVideoRef.current
        setVideoLabelSrc(getVideoLabel(hasVideoRef.current))

        if (!localStreamRef.current) {
            return
        }

        localStreamRef.current.getVideoTracks().forEach(track => {
            track.enabled = hasVideoRef.current
        })
   }

    const offerCall = async () => {
        await setupLocalMedia()

        const offer = await pc.current.createOffer()
        await pc.current.setLocalDescription(offer)
        sc.current.emit("offer", {
            roomId: RoomId,
            data: offer
        })
    }

    const leaveCall = () => {
        window.location.href = LEAVE_URL // Readirect instead of cleaning up
    }

    const handleOffer = async (offer: RTCSessionDescriptionInit) => {
        await pc.current.setRemoteDescription(new RTCSessionDescription(offer))
        const answer = await pc.current.createAnswer()
        await pc.current.setLocalDescription(answer)

        sc.current.emit("answer", {
            roomId: RoomId,
            data: answer
        })
    }

    const handleAnswer = async (answer: any) => {
        await pc.current.setRemoteDescription(new RTCSessionDescription(answer))
    }

    const handleRemoteICE = async (candidate: any) => {
        try {
            await pc.current.addIceCandidate(candidate)
        } catch (e) {
            console.error("Error adding received ice candidate", e)
        }
    }

    const atachPCListeners = () => {
        pc.current.onicecandidate = (event) => {
            if (event.candidate) {
                sc.current.emit("ice-candidate", {
                    roomId: RoomId,
                    data: event.candidate
                })
            }
        }

        pc.current.onconnectionstatechange = () => {
            if (pc.current.connectionState === 'disconnected' ||
                pc.current.connectionState === 'failed' ||
                pc.current.connectionState === 'closed') {
                resetConnection()
            }
        }

        pc.current.oniceconnectionstatechange = () => {
            console.log("Ice connection state: ", pc.current.iceConnectionState);
        };

        pc.current.ontrack = (event: RTCTrackEvent) => {
            const stream = event.streams && event.streams[0] ? event.streams[0] : new MediaStream([event.track])
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream
            }
        }
    }

    const resetConnection = async () => {
        pc.current = new RTCPeerConnection(RTC_CONFIG)

        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null
        }
        
        await setupLocalMedia() // Re atach media streams
        atachPCListeners()
    }

    if (!listenersAttachedRef.current) {
        listenersAttachedRef.current = true
        atachPCListeners()

        sc.current.on("offer", async (body: any) => {
            console.log("Got offer")
            await handleOffer(body.data)
        })

        sc.current.on("answer", (body: any) => {
            console.log("Got answer")
            handleAnswer(body.data)
        })

        sc.current.on("ice-candidate", (body: any) => {
            handleRemoteICE(body.data)
        })

        sc.current.on("disconnect", () => {
            console.log("Signaling disconnected!")
        })

        sc.current.on("bye", async () => {
            await resetConnection()
        })

        sc.current.on("connect", async () => {
            await offerCall()
        })
    }

    return (
        <div className="Videocall">
            <div className="controls">
                <button onClick={() => toggleAudio()}>
                    <img src={audioLabelSrc} alt="Toggle microphone"/>
                </button>
                
                <button onClick={() => toggleVideo()}>
                    <img src={videoLabelSrc} alt="Toggle cammera"/>
                </button>

                <button onClick={() => leaveCall()}>
                    <img src="/assets/phone-down.svg" alt="Leave call"/>
                </button>
            </div>
            <div>
                <div className="local-container">
                    <video ref={localVideoRef} autoPlay playsInline muted />
                </div>
            </div>
    
            <div>
                <div className="remote-container">
                    <video ref={remoteVideoRef} autoPlay playsInline />
                </div>
            </div>
        </div>
    )
}
