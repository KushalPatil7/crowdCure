import express from 'express';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth.js';
import Problem from '../models/Problem.js';
import Solution from '../models/Solution.js';
import mongoose from 'mongoose';

const router = express.Router();

// @route   POST /api/solutions
// @desc    Create a new solution
// @access  Private

// Get all solutions for a specific problem
router.get('/:problemId', auth, async (req, res) => {
  const { problemId } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    return res.status(400).json({ msg: 'Invalid Problem ID' });
  }

  try {
    const solutions = await Solution.find({ problemId })
      .populate('createdBy', ['name', 'email'])
      .sort({ createdAt: -1 });

    if (!solutions.length) {
      return res.status(404).json({ msg: 'No solutions found for this problem' });
    }

    res.json(solutions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
// UPDATE SOLUTION
router.patch('/:solutionId'
,auth,
[
  check('solutionDescription','Solution Description is required').optional().not().isEmpty(),

],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }
    try {
      const solution=Solution.findById(req.params.solutionId)
      if(!solution){
          return res.status(401).json({msg:'Solution Not Found'})
      }

      if(solution.createdBy.toString()!=req.user.id){
        return res.status(401).json({msg:'User Not Authenticated'})
      }
      const {solutionDescription,status,attachments}=req.body;
      if(solutionDescription) solution.solutionDescription=solutionDescription;
      if(status)solution.status=status;
      if(attachments)solution.attachments=attachments;

      solution.updatedAt=Date.now()
      await solution.save()
      res.json(solution)
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
})


// DELETE SOLUTION
router.delete('/:solutionId',
auth,
async(req,res)=>{
  try {
    const sol=Solution.findById(req.params.solutionId)
    if(!sol){
      return res.status(404).json({msg:"Solution Not Found"})
    }
    if(sol.createdBy.toString()!=req.user.id){
      return res.status(401).json({msg:'User Not Authenticated'})
    }
    await sol.remove();
    res.json({msg:"Solution removed"})

  } catch (error) {
    console.error(error.message);
        res.status(500).send('Server error');
  }
})

export default router;
