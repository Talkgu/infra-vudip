import React, { useEffect, useRef, useState } from 'react';


const JitsiConnection = () => {
    const [connection, setConnection] = useState(null);
    const [isJoined, setIsJoined] = useState(false);
    const localTracksRef = useRef([]);
    const remoteTracksRef = useRef({});

    useEffect(() => {
        
        // Configuración mínima para conexión a Jitsi Docker local
        const options = {
            hosts: {
                domain: 'localhost:8443',
                muc: 'conference.localhost', // esto viene del config Docker
            },
            serviceUrl: 'https://localhost:8443/http-bind', // endpoint BOSH
            // websocket: 'wss://localhost:8443/xmpp-websocket', // opcional
        };

        JitsiMeetJS.init();
        const conn = new JitsiMeetJS.JitsiConnection(null, null, options);

        conn.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
            onConnectionSuccess
        );
        conn.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_FAILED,
            onConnectionFailed
        );
        conn.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
            onConnectionDisconnected
        );

        conn.connect();
        setConnection(conn);

        return () => {
            conn.disconnect();
        };
    }, []);

    const onConnectionSuccess = () => {
        const room = connection.initJitsiConference('testroom', {
            openBridgeChannel: true,
        });

        room.on(
            JitsiMeetJS.events.conference.TRACK_ADDED,
            track => {
                if (track.isLocal()) {
                    localTracksRef.current.push(track);
                    const el = track.attach();
                    document.getElementById('localVideo').appendChild(el);
                } else {
                    remoteTracksRef.current[track.getId()] = track;
                    const el = track.attach();
                    document.getElementById('remoteVideos').appendChild(el);
                }
            }
        );

        room.on(
            JitsiMeetJS.events.conference.CONFERENCE_JOINED,
            () => {
                setIsJoined(true);
            }
        );

        room.join();
    };

    const onConnectionFailed = () => {
        console.error('Fallo la conexión');
    };

    const onConnectionDisconnected = () => {
    };

    return (
        <div>
            <h2>Jitsi Test Room</h2>
            <div id="localVideo" style={{ width: '300px', height: '200px', border: '1px solid black' }}></div>
            <div id="remoteVideos" style={{ width: '600px', height: '400px', border: '1px solid black' }}></div>
            {isJoined ? <p>Estás conectado a la sala</p> : <p>Conectando...</p>}
        </div>
    );
};

export default JitsiConnection;
