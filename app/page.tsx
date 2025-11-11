'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'

interface Frame {
  url: string
  description: string
}

interface Scene {
  name: string
  setting: string
  frames: Frame[]
}

const scenes: Scene[] = [
  {
    name: 'Datura Cannibalism',
    setting: 'Field by the sea at twilight',
    frames: [
      {
        url: '/frames/datura-1.jpg',
        description: 'Grotesque datura creature with troll-like features, mouth slightly ajar, eyes gleaming in coastal field'
      },
      {
        url: '/frames/datura-2.jpg',
        description: 'Same datura, mouth wider, revealing dark interior, another datura visible in background'
      },
      {
        url: '/frames/datura-3.jpg',
        description: 'Mouth opened dramatically, second datura being pulled toward gaping maw'
      },
      {
        url: '/frames/datura-4.jpg',
        description: 'Consumption complete, mouth closing with satisfaction, coastal waves in background'
      }
    ]
  },
  {
    name: 'Longan Consumption',
    setting: 'Under longan tree canopy, dappled sunlight',
    frames: [
      {
        url: '/frames/longan-1.jpg',
        description: 'Goblin-like longan creature with textured skin, beady eyes fixed on prey'
      },
      {
        url: '/frames/longan-2.jpg',
        description: 'Longan mouth opening, revealing cavity, victim longan suspended before it'
      },
      {
        url: '/frames/longan-3.jpg',
        description: 'Victim longan halfway into predator mouth, tree branches swaying above'
      },
      {
        url: '/frames/longan-4.jpg',
        description: 'Predator longan satiated, mouth sealed, lone longan shell on ground'
      }
    ]
  },
  {
    name: 'Apple Predation',
    setting: 'Rain-soaked apple orchard, stormy atmosphere',
    frames: [
      {
        url: '/frames/apple-1.jpg',
        description: 'Monster-faced green apple with malicious expression, raindrops beading on surface'
      },
      {
        url: '/frames/apple-2.jpg',
        description: 'Green apple mouth splits open, red apple in foreground, rain intensifying'
      },
      {
        url: '/frames/apple-3.jpg',
        description: 'Red apple being devoured, lightning illuminating the grotesque feast'
      },
      {
        url: '/frames/apple-4.jpg',
        description: 'Green apple alone, satisfied, red apple core discarded, rain washing evidence away'
      }
    ]
  }
]

export default function Home() {
  const [currentScene, setCurrentScene] = useState(0)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTechnique, setShowTechnique] = useState(false)
  const frameTimerRef = useRef<NodeJS.Timeout | null>(null)
  const sceneTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying) {
      frameTimerRef.current = setInterval(() => {
        setCurrentFrame(prev => {
          const nextFrame = prev + 1
          if (nextFrame >= scenes[currentScene].frames.length) {
            return 0
          }
          return nextFrame
        })
      }, 800)

      sceneTimerRef.current = setInterval(() => {
        setCurrentScene(prev => {
          const nextScene = (prev + 1) % scenes.length
          setCurrentFrame(0)
          return nextScene
        })
      }, 3200)

      return () => {
        if (frameTimerRef.current) clearInterval(frameTimerRef.current)
        if (sceneTimerRef.current) clearInterval(sceneTimerRef.current)
      }
    } else {
      if (frameTimerRef.current) clearInterval(frameTimerRef.current)
      if (sceneTimerRef.current) clearInterval(sceneTimerRef.current)
    }
  }, [isPlaying, currentScene])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSceneChange = (index: number) => {
    setCurrentScene(index)
    setCurrentFrame(0)
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>FRUIT CANNIBALISM</h1>
        <p className={styles.subtitle}>AI-Generated Stop-Motion Horror</p>
      </header>

      <div className={styles.container}>
        <div className={styles.viewer}>
          <div className={styles.sceneInfo}>
            <h2>{scenes[currentScene].name}</h2>
            <p>{scenes[currentScene].setting}</p>
          </div>

          <div className={styles.frameDisplay}>
            <div className={styles.imagePlaceholder}>
              <div className={styles.frameNumber}>
                Frame {currentFrame + 1} / {scenes[currentScene].frames.length}
              </div>
              <div className={styles.mockImage}>
                <div className={styles.imageContent}>
                  <div className={styles.creatureIcon}>🌿</div>
                  <p className={styles.frameDesc}>
                    {scenes[currentScene].frames[currentFrame].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <button onClick={handlePlayPause} className={styles.playButton}>
              {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
            </button>
            <div className={styles.sceneButtons}>
              {scenes.map((scene, index) => (
                <button
                  key={index}
                  onClick={() => handleSceneChange(index)}
                  className={`${styles.sceneButton} ${currentScene === index ? styles.active : ''}`}
                >
                  Scene {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            <h3>🎬 Technique Analysis</h3>
            <button
              onClick={() => setShowTechnique(!showTechnique)}
              className={styles.toggleButton}
            >
              {showTechnique ? '▼ Hide' : '▶ Show'} Details
            </button>

            {showTechnique && (
              <div className={styles.techniqueDetails}>
                <div className={styles.detail}>
                  <h4>Method</h4>
                  <p>Slideshow of 3-4 static AI images per scene, sequenced to create illusion of motion</p>
                </div>

                <div className={styles.detail}>
                  <h4>Visual Style</h4>
                  <p>Hyperrealistic 3D renders with grotesque, creature-like features - trolls, goblins, and monsters rather than "pretty" subjects</p>
                </div>

                <div className={styles.detail}>
                  <h4>Setting</h4>
                  <p>Natural outdoor environments: coastal fields, longan tree canopies, rain-soaked orchards</p>
                </div>

                <div className={styles.detail}>
                  <h4>👄 Mouth Illusion</h4>
                  <p className={styles.highlight}>The mouth is NOT actually moving. Each frame is a completely separate static image with the mouth rendered in different positions. The brain interprets the sequence as continuous motion.</p>
                </div>

                <div className={styles.detail}>
                  <h4>Concept</h4>
                  <p>"Fruit cannibalism" - a popular AI art trope featuring hyperrealistic fruit creatures consuming their own kind</p>
                </div>
              </div>
            )}
          </div>

          <div className={styles.infoCard}>
            <h3>📋 Scene Breakdown</h3>
            <ul className={styles.sceneList}>
              {scenes.map((scene, index) => (
                <li
                  key={index}
                  className={currentScene === index ? styles.activeScene : ''}
                  onClick={() => handleSceneChange(index)}
                >
                  <strong>{scene.name}</strong>
                  <p>{scene.setting}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h3>⚙️ Technical Specs</h3>
            <div className={styles.specs}>
              <div className={styles.spec}>
                <span>Frame Rate:</span>
                <strong>~1.25 FPS</strong>
              </div>
              <div className={styles.spec}>
                <span>Frames/Scene:</span>
                <strong>3-4 frames</strong>
              </div>
              <div className={styles.spec}>
                <span>Scene Duration:</span>
                <strong>~3.2 seconds</strong>
              </div>
              <div className={styles.spec}>
                <span>Generation:</span>
                <strong>AI (Static Renders)</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <footer className={styles.footer}>
        <p>⚠️ This is a demonstration of AI-generated stop-motion animation techniques</p>
        <p className={styles.note}>Each "frame" is a separate static AI-generated image. No actual animation or video generation involved.</p>
      </footer>
    </main>
  )
}
