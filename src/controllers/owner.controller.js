const Owner = require('../models/owner.model')

const addOwner = async (req, res) => {
    try {
        const ownerData = req.body;

        const owner = new Owner(ownerData);
        owner.save()
            .then((result) => {
                return res.status(201).json(result)
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json({ error: "Failed to save owner" })
            })


    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: "Failed to save owner" })
    }
}

const getOwners = async(req,res) => {
  const pageSize = 10;
  const currentPage = req.headers.count;
  console.log(currentPage);
  const skipCount = (currentPage - 1) * pageSize;
    try {
        const result = await Owner.find().skip(skipCount).limit(pageSize)

        const totalCount = await Owner.countDocuments();

        if(result) {
            return res.status(200).json({
              result,
              totalCount: totalCount
            })
        }
        res.status(400).json({error: "unable to fetch data "})
    }
    catch(err) {
        console.log(err)
        res.status(500).json({error: "Server Error"})
    }
}

const updateOwner = async (req, res) => {
    try {
      const ownerId = req.params.id;
      const updateData = req.body;
  
      const owner = await Owner.findByIdAndUpdate(ownerId, updateData, { new: true });
  
      if (!owner) {
        return res.status(404).json({ error: 'Owner not found' });
      }
  
      res.json({ message: 'Owner updated successfully', data: owner });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
};

const deleteOwner = async (req, res) => {
    try {
      const ownerId = req.params.id;
  
      const owner = await Owner.findByIdAndDelete(ownerId);
  
      if (!owner) {
        return res.status(404).json({ error: 'Owner not found' });
      }
  
      res.json({ message: 'Owner deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

module.exports = { addOwner, getOwners, updateOwner, deleteOwner }