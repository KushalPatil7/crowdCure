import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import Solution from "../models/Solution.js";

// Upvote Solution
router.post('/upvote/:solutionId', auth, async (req, res) => {
    try {
        // Use findOneAndUpdate for atomic operation
        const solution = await Solution.findOneAndUpdate(
            {
                _id: req.params.solutionId,
                upvotes: { $ne: req.user.id }  // Check if not already upvoted
            },
            {
                $pull: { downvotes: req.user.id },  // Remove from downvotes
                $addToSet: { upvotes: req.user.id }, // Add to upvotes
                $inc: { voteCount: 1 }  // Increment vote count
            },
            { new: true }
        );

        if (!solution) {
            return res.status(400).json({ 
                msg: 'Solution not found or already upvoted' 
            });
        }

        res.json({ 
            msg: 'Solution upvoted successfully',
            upvotes: solution.upvotes.length,
            downvotes: solution.downvotes.length,
            voteCount: solution.voteCount
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Downvote Solution
router.post('/downvote/:solutionId', auth, async (req, res) => {
    try {
        const solution = await Solution.findById(req.params.solutionId);
        if (!solution) {
            return res.status(404).json({ msg: 'Solution Not Found' });
        }

        // Check if user has already downvoted
        if (solution.downvotes.includes(req.user.id)) {
            return res.status(400).json({ msg: 'User has already downvoted' });
        }

        // Remove from upvotes if present
        solution.upvotes = solution.upvotes.filter(userId => userId !== req.user.id);

        // Add to downvotes
        solution.downvotes.push(req.user.id);

        await solution.save();
        res.json({ msg: 'Solution downvoted successfully', upvotes: solution.upvotes.length, downvotes: solution.downvotes.length });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Fetch Votes for a Solution
router.get('/votes/:solutionId', async (req, res) => {
    try {
        const solution = await Solution.findById(req.params.solutionId);
        if (!solution) {
            return res.status(404).json({ msg: 'Solution Not Found' });
        }

        res.json({ upvotes: solution.upvotes.length, downvotes: solution.downvotes.length });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

export default router;
