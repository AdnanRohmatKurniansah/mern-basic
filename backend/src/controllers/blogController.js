const {validationResult} = require('express-validator')

exports.create = (req, res, next) => {
    const title = req.body.title
    const body = req.body.body

    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        const err = new Error('Invalid value')
        err.errorStatus = 400
        err.data = errors.array()
        throw err
    }

    const result = {
        message: 'Berhasil menambahkan blog post baru',
        data: {
            id: 1,
            title: 'ini judul',
            // image: 'imagefile.png',
            body: 'lorenrkendkendfknefkenfen',
            created_at: '12/09/23',
            author: {
                id: 1,
                name: 'adnan'
            }
        }
    }
    res.status(201).json(result)
}