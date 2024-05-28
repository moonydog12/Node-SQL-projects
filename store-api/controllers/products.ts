const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: 'products testing route' })
}

export { getAllProductsStatic }
