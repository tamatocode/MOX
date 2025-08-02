"use client"

import { useEffect, useRef, useState } from "react"

export default function TokenDisplay() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    // Check device type on mount and when window resizes
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsLargeScreen(window.innerWidth >= 1440)
    }
    
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Improved responsive sizing
    const getCanvasSize = () => {
      const windowWidth = window.innerWidth
      
      if (windowWidth < 480) {
        return Math.min(windowWidth - 40, 180) // For very small screens
      } else if (windowWidth < 640) {
        return 220 // Larger size for small mobile
      } else if (windowWidth < 1024) {
        return 280 // Medium size for tablets
      } else if (windowWidth < 1440) {
        return 320 // Standard desktop size
      } else {
        return 380 // Large desktop size
      }
    }

    let size = getCanvasSize()
    const scale = window.devicePixelRatio || 1

    // Set canvas dimensions
    const updateCanvasSize = () => {
      size = getCanvasSize()
      canvas.width = size * scale
      canvas.height = size * scale
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      
      // Reset scale when size changes
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(scale, scale)
    }
    
    updateCanvasSize()

    const centerX = size / 2
    const centerY = size / 2
    
    // Adjust radius based on screen size
    const getRadius = () => {
      if (isLargeScreen) return size * 0.44
      if (isMobile) return size * 0.42
      return size * 0.42
    }
    
    const radius = getRadius()

    // Animation variables
    let animationPhase = 0
    
    // Reduce animation complexity on mobile
    const getAnimationSpeed = () => {
      if (isMobile) return 0.007
      if (isLargeScreen) return 0.012
      return 0.01
    }
    
    // Reduce number of elements on mobile
    const getCircuitLines = () => {
      if (isMobile) return 8
      if (isLargeScreen) return 16
      return 12
    }
    
    const getCircuitNodes = () => {
      if (isMobile) return 12
      if (isLargeScreen) return 25
      return 20
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawToken(
        ctx, 
        centerX, 
        centerY, 
        radius, 
        animationPhase, 
        size, 
        isMobile,
        getCircuitLines(),
        getCircuitNodes(),
        isLargeScreen
      )
      animationPhase += getAnimationSpeed()
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Handle window resize
    const handleResize = () => {
      updateCanvasSize()
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("resize", checkScreenSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isMobile, isLargeScreen])

  return (
    <div className="token-container relative flex justify-center items-center w-full py-4 overflow-visible">
      <canvas 
        ref={canvasRef} 
        className="shadow-[0_0_20px_rgba(218,165,32,0.4)] rounded-full" 
      />
    </div>
  )
}

function drawToken(ctx, centerX, centerY, radius, phase, size, isMobile, lines, nodes, isLargeScreen) {
  // Create gradient for the main coin body
  const mainGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.1, centerX, centerY, radius)
  mainGradient.addColorStop(0, "#3a3a30")
  mainGradient.addColorStop(0.8, "#2a2a20")
  mainGradient.addColorStop(1, "#1a1a15")

  // Create gradient for the gold border
  const borderGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.9, centerX, centerY, radius)
  borderGradient.addColorStop(0, "#d4af37")
  borderGradient.addColorStop(0.5, "#f9d776")
  borderGradient.addColorStop(1, "#d4af37")

  // Draw main coin body
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.fillStyle = mainGradient
  ctx.fill()

  // Draw outer gold border with responsive thickness
  const borderThickness = radius * (isMobile ? 0.05 : 0.04)
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.lineWidth = borderThickness
  ctx.strokeStyle = borderGradient
  ctx.stroke()

  // Draw inner circle
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2)
  ctx.lineWidth = radius * 0.02
  ctx.strokeStyle = borderGradient
  ctx.stroke()

  // Draw animated circuit board pattern with mobile optimization
  drawCircuitPattern(ctx, centerX, centerY, radius * 0.7, phase, size, isMobile, lines, nodes)

  // Draw stars around the edge - fewer stars on mobile
  const stars = isMobile ? 10 : 16
  drawStars(ctx, centerX, centerY, radius * 0.9, stars, phase, size)

  // Draw RCX text with subtle glow animation
  drawText(ctx, centerX, centerY, radius, phase, size, isMobile)
}

function drawCircuitPattern(ctx, centerX, centerY, radius, phase, size, isMobile, lines, nodes) {
  const circleRadius = radius * 0.1

  // Use less intense animation for mobile to improve performance
  const pulseIntensity = 0.3 + Math.sin(phase * (isMobile ? 1.5 : 2)) * (isMobile ? 0.08 : 0.1)

  ctx.strokeStyle = `rgba(218, 165, 32, ${pulseIntensity})`
  ctx.lineWidth = size * 0.002 // Scale line width based on size

  // Draw circuit lines - fewer on mobile
  for (let i = 0; i < lines; i++) {
    const angle = ((Math.PI * 2) / lines) * i + phase * 0.1
    const startX = centerX + Math.cos(angle) * circleRadius
    const startY = centerY + Math.sin(angle) * circleRadius
    const endX = centerX + Math.cos(angle) * radius
    const endY = centerY + Math.sin(angle) * radius

    ctx.beginPath()
    ctx.moveTo(startX, startY)

    // Add fewer bends on mobile
    const bendPoints = isMobile ? 
      Math.floor(Math.random() * 2) + 1 : 
      Math.floor(Math.random() * 3) + 1
    
    let lastX = startX
    let lastY = startY

    for (let j = 1; j <= bendPoints; j++) {
      const t = j / (bendPoints + 1)
      const dist = circleRadius + (radius - circleRadius) * t

      // Add some randomness to the bend with animation
      const bendAngle = angle + 
        (Math.random() * (isMobile ? 0.3 : 0.4) - (isMobile ? 0.15 : 0.2)) + 
        Math.sin(phase + i) * (isMobile ? 0.03 : 0.05)
      
      const nextX = centerX + Math.cos(bendAngle) * dist
      const nextY = centerY + Math.sin(bendAngle) * dist

      ctx.lineTo(nextX, nextY)

      // Add small circles at bend points with animation - fewer on mobile
      if (Math.random() > (isMobile ? 0.8 : 0.7)) {
        ctx.stroke()
        ctx.beginPath()

        // Animate the node size - smaller animation range on mobile
        const nodeSize = (size * 0.005) + 
          Math.sin(phase * (isMobile ? 2 : 3) + i * 0.5) * 
          (size * (isMobile ? 0.001 : 0.0015))

        ctx.arc(nextX, nextY, nodeSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(218, 165, 32, ${pulseIntensity + 0.2})`
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(nextX, nextY)
      }

      lastX = nextX
      lastY = nextY
    }

    ctx.lineTo(endX, endY)
    ctx.stroke()
  }

  // Add some random dots for circuit nodes with animation - fewer on mobile
  for (let i = 0; i < nodes; i++) {
    const nodePhase = phase + i * 0.2
    const angle = Math.random() * Math.PI * 2 + phase * 0.1
    const dist = circleRadius + Math.random() * (radius - circleRadius)
    const x = centerX + Math.cos(angle) * dist
    const y = centerY + Math.sin(angle) * dist

    // Animate the node size and opacity - reduced animation on mobile
    const nodeSize = (size * 0.005) + 
      Math.sin(nodePhase * (isMobile ? 1.5 : 2)) * 
      (size * (isMobile ? 0.001 : 0.0015))
    
    const nodeOpacity = 0.5 + Math.sin(nodePhase * (isMobile ? 2 : 3)) * (isMobile ? 0.15 : 0.2)

    ctx.beginPath()
    ctx.arc(x, y, nodeSize, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(218, 165, 32, ${nodeOpacity})`
    ctx.fill()
  }
}

function drawStars(ctx, centerX, centerY, radius, count, phase, size) {
  const starRadius = radius * 0.05

  for (let i = 0; i < count; i++) {
    const angle = ((Math.PI * 2) / count) * i
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius

    // Animate star size with subtle pulsing
    const starSize = starRadius * (0.9 + Math.sin(phase * 2 + i * 0.5) * 0.1)

    drawStar(ctx, x, y, starSize, 5, phase + i * 0.2, size)
  }
}

function drawStar(ctx, cx, cy, radius, spikes, phase, size) {
  let rot = (Math.PI / 2) * 3
  const step = Math.PI / spikes

  // Gold gradient for stars with animation
  const starGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)

  // Animate the gradient colors
  const colorIntensity = 0.8 + Math.sin(phase) * 0.2
  starGradient.addColorStop(0, `rgba(249, 215, 118, ${colorIntensity})`)
  starGradient.addColorStop(1, `rgba(212, 175, 55, ${colorIntensity})`)

  ctx.beginPath()
  ctx.moveTo(cx, cy - radius)

  for (let i = 0; i < spikes; i++) {
    const x1 = cx + Math.cos(rot) * radius
    const y1 = cy + Math.sin(rot) * radius
    rot += step

    const x2 = cx + Math.cos(rot) * (radius * 0.4)
    const y2 = cy + Math.sin(rot) * (radius * 0.4)
    rot += step

    ctx.lineTo(x1, y1)
    ctx.lineTo(x2, y2)
  }

  ctx.lineTo(cx, cy - radius)
  ctx.closePath()
  ctx.fillStyle = starGradient
  ctx.fill()
}

function drawText(ctx, centerX, centerY, radius, phase, size, isMobile) {
  // Animate text with subtle glow effect - reduced on mobile
  const glowIntensity = 5 + Math.sin(phase * (isMobile ? 1.5 : 2)) * (isMobile ? 2 : 3)

  ctx.save()

  // Add glow effect
  ctx.shadowColor = "#f9d776"
  ctx.shadowBlur = glowIntensity

  // Responsive font size based on device
  let fontSize = radius * 0.3
  if (isMobile) {
    fontSize = radius * 0.35 // Larger on mobile for better visibility
  }

  ctx.font = `bold ${fontSize}px Arial`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  // Gold gradient for text
  const textGradient = ctx.createLinearGradient(centerX - radius * 0.4, centerY, centerX + radius * 0.4, centerY)
  textGradient.addColorStop(0, "#d4af37")
  textGradient.addColorStop(0.5, "#f9d776")
  textGradient.addColorStop(1, "#d4af37")

  ctx.fillStyle = textGradient
  ctx.fillText("RCX", centerX, centerY)

  ctx.restore()
}
