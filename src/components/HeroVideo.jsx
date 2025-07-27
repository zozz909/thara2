import React, { useState, useRef, useEffect } from 'react'

const HeroVideo = ({ videoSrc, fallbackImage, enableSound = false }) => {
  const [hasVideo, setHasVideo] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(!enableSound)
  const [showSoundPrompt, setShowSoundPrompt] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    // Check if video file exists
    const checkVideoExists = async () => {
      try {
        const response = await fetch(videoSrc, { method: 'HEAD' })
        if (response.ok) {
          setHasVideo(true)
          console.log('Video file found:', videoSrc)
        }
      } catch (error) {
        console.log('Video not found, using fallback image:', error)
        setHasVideo(false)
      }
    }

    if (videoSrc) {
      checkVideoExists()
    }
  }, [videoSrc])

  // Auto-play when component mounts and video is ready
  useEffect(() => {
    if (hasVideo && videoRef.current && !videoLoaded) {
      const video = videoRef.current

      // Ensure video is ready to play
      const handleCanPlay = () => {
        handleVideoLoad()
      }

      video.addEventListener('canplay', handleCanPlay)

      return () => {
        video.removeEventListener('canplay', handleCanPlay)
      }
    }
  }, [hasVideo, videoLoaded])

  // Try to enable sound on first user interaction
  useEffect(() => {
    if (!enableSound) return

    const enableSoundOnInteraction = async () => {
      if (videoRef.current && videoRef.current.muted && isPlaying) {
        try {
          videoRef.current.muted = false
          setIsMuted(false)
          setShowSoundPrompt(false) // Hide the prompt
          console.log('🔊 Sound enabled after user interaction!')
        } catch (error) {
          console.log('Failed to enable sound:', error)
        }
      }
    }

    // Listen for any user interaction to enable sound
    const events = ['click', 'touchstart', 'keydown', 'scroll']

    events.forEach(event => {
      document.addEventListener(event, enableSoundOnInteraction, { once: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, enableSoundOnInteraction)
      })
    }
  }, [enableSound, isPlaying, isMuted])

  const handleVideoLoad = () => {
    setVideoLoaded(true)
    if (videoRef.current) {
      // Set initial volume to maximum for better sound experience
      videoRef.current.volume = 1.0

      // Force autoplay with sound - more aggressive approach
      if (enableSound) {
        // First attempt: Try with sound immediately
        videoRef.current.muted = false
        setIsMuted(false)

        const playWithSound = async () => {
          try {
            await videoRef.current.play()
            setIsPlaying(true)
            console.log('✅ Video started playing with sound successfully!')
          } catch (error) {
            console.log('⚠️ Direct sound autoplay failed, trying user interaction approach:', error)

            // Fallback: Start muted and provide unmute option
            videoRef.current.muted = true
            setIsMuted(true)

            try {
              await videoRef.current.play()
              setIsPlaying(true)
              console.log('🔇 Video started muted - user can unmute manually')

              // Show visual prompt to enable sound
              setShowSoundPrompt(true)
              setTimeout(() => {
                setShowSoundPrompt(false)
              }, 5000) // Hide after 5 seconds

            } catch (mutedError) {
              console.log('❌ Video autoplay failed completely:', mutedError)
            }
          }
        }

        playWithSound()
      } else {
        // Play muted if sound is disabled
        videoRef.current.muted = true
        videoRef.current.play().then(() => {
          setIsPlaying(true)
          console.log('🔇 Video started playing muted (sound disabled)')
        }).catch(error => {
          console.log('❌ Video autoplay failed:', error)
        })
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const handleVideoError = () => {
    console.log('Video failed to load, using fallback')
    setHasVideo(false)
  }

  if (!hasVideo) {
    // Show message in console for developers
    console.log('Video file not found at:', videoSrc, '- Using fallback background image')
    return null // Fallback to CSS background image
  }

  return (
    <div className="hero-video">
      <video
        ref={videoRef}
        autoPlay
        muted={false}
        loop
        playsInline
        preload="auto"
        controls={false}
        className="hero-video-bg"
        onLoadedData={handleVideoLoad}
        onCanPlay={handleVideoLoad}
        onError={handleVideoError}
        onLoadStart={() => console.log('🎬 Video loading started')}
        onPlay={() => console.log('▶️ Video started playing')}
        onVolumeChange={() => console.log('🔊 Volume changed:', videoRef.current?.volume)}
        style={{
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Video Controls */}
      {videoLoaded && enableSound && (
        <div className="video-controls" style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          zIndex: 10,
          display: 'flex',
          gap: '10px'
        }}>
          <button
            onClick={togglePlay}
            className="video-control-btn"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
          >
            <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
          </button>

          <button
            onClick={toggleMute}
            className="video-control-btn"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
          >
            <i className={`bi ${isMuted ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'}`}></i>
          </button>
        </div>
      )}

      {/* Sound Enable Prompt */}
      {showSoundPrompt && (
        <div className="sound-prompt" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '20px 30px',
          borderRadius: '10px',
          textAlign: 'center',
          zIndex: 20,
          animation: 'fadeInOut 0.5s ease-in-out'
        }}>
          <i className="bi bi-volume-up-fill" style={{ fontSize: '2rem', marginBottom: '10px', display: 'block' }}></i>
          <p style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>انقر لتفعيل الصوت</p>
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = false
                setIsMuted(false)
                setShowSoundPrompt(false)
                console.log('🔊 Sound enabled by user!')
              }
            }}
            style={{
              background: 'var(--primary-color)',
              border: 'none',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            تفعيل الصوت
          </button>
        </div>
      )}

      {/* Loading placeholder */}
      {!videoLoaded && hasVideo && (
        <div className="video-loading" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, rgba(160, 130, 109, 0.8) 0%, rgba(93, 78, 55, 0.85) 50%, rgba(62, 39, 35, 0.9) 100%), url('${fallbackImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.2rem'
        }}>
          <div className="loading-spinner">
            <i className="bi bi-play-circle" style={{ fontSize: '3rem', opacity: 0.7 }}></i>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeroVideo
