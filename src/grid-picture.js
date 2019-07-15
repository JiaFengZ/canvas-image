/**
* 生成一个位置，颜色，大小随机的点分布图
*/
const canvasSketch = require('canvas-sketch')
const { randomColor } = require('./utils')

const settings = {
  dimensions: [ 2048, 2048 ]
};

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
          radius: Math.random() * 20,
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
        color
      } = data
      const [u, v] = position
      const x = u * (width - 2 * margin) + margin  // 限制坐标在 margin 边界范围内
      const y = v * (height - 2 * margin) + margin

      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2) // x y 弧心坐标 radius 半径 startAngle endAngle
      context.fillStyle = color
      context.fill()
    })
  }
}

canvasSketch(sketch, settings)