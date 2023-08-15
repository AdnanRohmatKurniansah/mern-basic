exports.createProduct = (req, res, next) => {
    res.json({
        message: 'Berhasil menambahkan product baru',
        data: {
            id: 1,
            nama: 'oreo',
            harga: 2500
        }
    })
    next()
}

exports.allProducts = (req, res, next) => {
    res.json({
        message: 'Berhasil mendapatkan data product',
        data: {
            id: 1,
            nama: 'oreooo',
            harga: 2500
        }
    })
}
