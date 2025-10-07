const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');
// Get all notes for user
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});
// Create note
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Note({ user: req.user.id, title, content });
    await note.save();
    res.json(note);
  } catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});
// Update note
router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    let note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({ message: 'Note not found' });
    if(note.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    note.title = title ?? note.title;
    note.content = content ?? note.content;
    await note.save();
    res.json(note);
  } catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});
// Delete note
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({ message: 'Note not found' });
    if(note.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    await note.remove();
    res.json({ message: 'Note removed' });
  } catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});
module.exports = router;
