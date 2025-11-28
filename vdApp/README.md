# Talkgu Videocall Service

A modern videocall service built with Jitsi lib-jitsi-meet for seamless video conferencing experiences.

## Features

- 🎥 High-quality video calling
- 🎤 Crystal clear audio
- 🖥️ Screen sharing
- 💬 Real-time chat
- 👥 Multi-participant support
- 📱 Responsive design
- 🔒 Secure communication
- 🌐 Cross-platform compatibility

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser with WebRTC support

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Talkgu/videocall-service.git
cd videocall-service
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Usage

### Joining a Conference

1. Enter a room name
2. Enter your display name
3. Configure your camera and microphone (optional)
4. Click "Join Meeting"

### During a Conference

- **Mute/Unmute Audio**: Click the microphone button
- **Turn Camera On/Off**: Click the camera button
- **Share Screen**: Click the screen share button
- **Open Chat**: Click the chat button
- **Leave Call**: Click the red phone button

## Configuration

### Jitsi Server Configuration

The default configuration uses the public Jitsi Meet server (`meet.jit.si`). To use your own Jitsi server:

1. Edit `src/config/jitsi-config.js`
2. Update the server URLs in the connection options
3. Rebuild the application

Example:
```javascript
const connectionOptions = {
    hosts: {
        domain: 'your-jitsi-server.com',
        muc: 'conference.your-jitsi-server.com'
    },
    bosh: '//your-jitsi-server.com/http-bind',
    websocket: 'wss://your-jitsi-server.com/xmpp-websocket'
};
```

### Media Settings

Adjust video and audio quality in `src/config/jitsi-config.js`:

```javascript
mediaConstraints: {
    video: {
        height: { ideal: 720, max: 720, min: 240 },
        width: { ideal: 1280, max: 1280, min: 320 },
        frameRate: { ideal: 30, max: 30, min: 15 }
    },
    audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
    }
}
```

## Architecture

### Core Components

- **VideocallService**: Main orchestrator class
- **UIManager**: Handles all user interface interactions
- **MediaManager**: Manages local media tracks (audio/video/screen)
- **ConferenceManager**: Handles Jitsi conference connection and events
- **ChatManager**: Manages chat functionality

### File Structure

```
src/
├── index.js              # Main entry point
├── config/
│   └── jitsi-config.js   # Jitsi configuration
├── ui/
│   └── ui-manager.js     # UI management
├── media/
│   └── media-manager.js  # Media handling
├── conference/
│   └── conference-manager.js # Conference management
└── chat/
    └── chat-manager.js   # Chat functionality

public/
├── index.html            # Main HTML template
└── styles.css           # CSS styles
```

## API Reference

### VideocallService

Main class that orchestrates the entire videocall experience.

#### Methods

- `joinConference()`: Join a conference room
- `leaveConference()`: Leave the current conference
- `toggleAudio()`: Mute/unmute audio
- `toggleVideo()`: Turn camera on/off
- `shareScreen()`: Start/stop screen sharing

### MediaManager

Handles local media tracks and device management.

#### Methods

- `createLocalTracks()`: Create audio and video tracks
- `shareScreen()`: Start screen sharing
- `getVideoDevices()`: Get available video devices
- `switchVideoDevice(deviceId)`: Switch to different camera

### ConferenceManager

Manages Jitsi conference connection and events.

#### Methods

- `connect(serverUrl)`: Connect to Jitsi server
- `joinConference(roomName, displayName)`: Join conference room
- `sendTextMessage(message)`: Send chat message

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Security

- All communication is encrypted using DTLS-SRTP
- No media data is stored on servers
- Peer-to-peer communication when possible
- Support for authenticated conferences

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

**Camera/Microphone not working**
- Check browser permissions
- Ensure HTTPS connection (required for WebRTC)
- Try a different browser

**Connection issues**
- Check firewall settings
- Verify Jitsi server accessibility
- Check network connectivity

**Audio/Video quality issues**
- Check network bandwidth
- Adjust quality settings in configuration
- Close other applications using camera/microphone

### Debug Mode

Enable debug logging by modifying `src/index.js`:

```javascript
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.DEBUG);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Jitsi Meet](https://jitsi.org/) for the excellent WebRTC library
- [lib-jitsi-meet](https://github.com/jitsi/lib-jitsi-meet) for the JavaScript API
- WebRTC community for making real-time communication possible

## Support

For support and questions, please open an issue on GitHub or contact the Talkgu team.

---

Built with ❤️ by the Talkgu team
