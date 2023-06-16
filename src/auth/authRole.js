
const authRole = (requiredRole) => {
    return (req,res,next) => {
        const userRole = req.body.role;

        if(userRole == requiredRole) {
            next()
        }
        else {
            return res.status(401).json({error: 'Access Denied'})
        }
    }
}