import React, { useEffect } from 'react'
import HeroVideo from './HeroVideo'
import YouTubeVideo from './YouTubeVideo'
import SimpleYouTubeVideo from './SimpleYouTubeVideo'

const Hero = () => {
  useEffect(() => {
    // Log video setup info for developers
    console.log('🎬 Hero Video Setup:')
    console.log('- Video file should be at: public/assets/video.mp4')
    console.log('- Auto-play with sound is ENABLED')
    console.log('- Aggressive sound autoplay approach activated')
    console.log('- Fallback: Background image will show if video not found')
    console.log('- See VIDEO_INSTRUCTIONS.md for detailed setup guide')

    // Try to prepare audio context for better autoplay success
    if (typeof window !== 'undefined' && window.AudioContext) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        if (audioContext.state === 'suspended') {
          console.log('🔊 Audio context prepared for autoplay')
        }
      } catch (error) {
        console.log('Audio context setup failed:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Parallax effect (disabled on mobile for performance)
    let ticking = false

    const updateParallax = () => {
      if (window.innerWidth <= 768) return // Skip parallax on mobile

      const scrolled = window.pageYOffset
      const heroSection = document.querySelector('.hero-section')

      if (heroSection) {
        const rate = scrolled * -0.2
        heroSection.style.transform = `translateY(${rate}px)`
      }

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



  return (
    <section id="home" className="hero-section">
      {/* Local Video - Auto Play with Sound */}
      <HeroVideo
        videoSrc="/assets/video.mp4"
        fallbackImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        enableSound={true}
      />

      {/* Alternative: Simple YouTube Video (Backup) */}
      {/* <SimpleYouTubeVideo
        videoId="IyHhWFIecc8"
        fallbackImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      /> */}

      {/* Alternative: Advanced YouTube Video */}
      {/* <YouTubeVideo
        videoId="IyHhWFIecc8"
        fallbackImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        enableSound={true}
      /> */}
    </section>
  )
}

export default Hero
