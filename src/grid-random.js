/**
* 生成一个随机分布的网格点
* 网格点分布距离边界固定margin
*/
const canvasSketch = require('canvas-sketch')

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
        points.push([u, v])
      }
    }
    return points
  }

  const points = createGrid(30).filter(() => Math.random() > 0.5)
  
  return ({ context, width, height }) => {
    const margin = width * 0.175
    
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    points.forEach(([u, v]) => {
      const x = u * (width - 2 * margin) + margin  // 限制坐标在 margin 边界范围内
      const y = v * (height - 2 * margin) + margin

      context.beginPath()
      context.arc(x, y, 10, 0, Math.PI * 2) // x y 弧心坐标 radius 半径 startAngle endAngle
      context.fillStyle = 'black'
      context.fill()
    })
  }
}

canvasSketch(sketch, settings)