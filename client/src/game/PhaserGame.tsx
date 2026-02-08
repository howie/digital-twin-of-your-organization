import { useEffect, useRef } from 'react'
import Phaser from 'phaser'

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    // Create a simple sprite texture programmatically
    const graphics = this.add.graphics()
    graphics.fillStyle(0x4ade80, 1)
    graphics.fillCircle(16, 16, 14)
    graphics.generateTexture('agent-sprite', 32, 32)
    graphics.destroy()
  }

  create() {
    // Solid-color background
    this.cameras.main.setBackgroundColor('#1e293b')

    // Add at least one sprite (character) visible on screen (SC-004)
    const sprite = this.add.sprite(400, 300, 'agent-sprite')
    sprite.setScale(1.5)

    // Add a label
    this.add.text(400, 340, 'Agent', {
      fontSize: '14px',
      color: '#e2e8f0',
    }).setOrigin(0.5)

    // Add title
    this.add.text(400, 40, 'Digital Twin World', {
      fontSize: '20px',
      color: '#94a3b8',
    }).setOrigin(0.5)
  }
}

export default function PhaserGame() {
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (gameContainerRef.current && !gameRef.current) {
      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameContainerRef.current,
        scene: [MainScene],
        backgroundColor: '#1e293b',
      })
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [])

  return <div ref={gameContainerRef} className="w-full h-full" />
}
