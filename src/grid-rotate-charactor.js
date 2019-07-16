/**
* 随机字母图
* 随机旋转
*/
const canvasSketch = require('canvas-sketch')
const { randomColor } = require('./utils')

const settings = {
  dimensions: [ 2048, 2048 ]
}

const charactors = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K']

const sketch = () => {
  const createGrid = (count) => {
    const points = []
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1) // 归一化坐标
        const v = y / (count - 1)
        const position = [u, v]
        points.push({
          color: randomColor(),
          radius: Math.random() * 30,
          charactor: charactors[Math.floor(Math.random() * 10)],
          rotation: Math.random() * (Math.PI * 2),
          position
        })
      }
    }
    return points
  }

  const points = createGrid(60).filter(() => Math.random() > 0.5)
  
  return ({ context, width, height }) => {
    const margin = width * 0.175
    
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    points.forEach(data => {
      const {
        position,
        radius,
        color,
        charactor,
        rotation
      } = data
      const [u, v] = position
      const x = u * (width - 2 * margin) + margin  // 限制坐标在 margin 边界范围内
      const y = v * (height - 2 * margin) + margin

      context.fillStyle = color
      context.font = `${radius}px "Serif"`
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      context.save()
      context.translate(x, y)
      context.rotate(rotation)
      context.fillText(charactor, 0, 0)
      context.restore()
    })
  }
}

canvasSketch(sketch, settings)