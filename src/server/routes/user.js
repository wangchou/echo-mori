export default (req, res) => {
    if(!req.user) {
        res.send({})
    } else {
        res.send(req.user)
    }
}
