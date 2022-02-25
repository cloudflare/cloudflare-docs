const random = () => Math.random().toString().split('.')[1]

export default prefix => `${prefix}-${random()}`
