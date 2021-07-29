module.exports = {
    sendError: (req, res, next) =>  {
        res.sendError = (msg) => {
            res.send({
                status: 'Error',
                message: msg,
            })
        }
        next()
      },

    sendResponse: (req, res, next) =>  {
        res.sendResponse = (data) => {
            res.send({
                status: 'success',
                Data: data
            })
        }
        next()
      }
}