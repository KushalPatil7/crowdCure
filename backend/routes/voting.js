import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import Solution from "../models/Solution.js";

// Upvote Solution
router.post('/upvote/:solutionId', auth, async (req, res) => {
    try {
        const solution = await Solution.findById(req.params.solutionId);
        if (!solution) {
            return res.status(404).json({ msg: 'Solution Not Found' });
        }

        // Check if user has already voted
        if (solution.votes.includes(req.user.id)) {
            return res.status(400).json({ msg: 'User has already voted' });
        }

        // Add user to votes and increment vote count
        solution.votes.push(req.user.id);
        solution.votesCount += 1;

        await solution.save();
        res.json({ msg: 'Solution upvoted successfully', solution });
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

        // Check if user has already voted
        if (solution.votes.includes(req.user.id)) {
            return res.status(400).json({ msg: 'User has already voted' });
        }

        // Add user to votes and decrement vote count
        solution.votes.push(req.user.id);
        solution.votesCount -= 1;

        await solution.save();
        res.json({ msg: 'Solution downvoted successfully', solution });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

export default router;
