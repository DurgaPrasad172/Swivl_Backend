const { PrismaClient } = require('@prisma/client');
const pdfService = require('../services/pdfServices');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });

    const pdfPath = path.join(__dirname, '../../pdfs', `${user.id}.pdf`);
    await pdfService.generatePdf(user, pdfPath);

    await prisma.user.update({
      where: { id: user.id },
      data: { pdfPath },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

const getUserPdf = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.pdfPath) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    res.sendFile(user.pdfPath);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve PDF' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });

    if (user.pdfPath) {
      fs.unlinkSync(user.pdfPath);
    }

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });

    const pdfPath = path.join(__dirname, '../../pdfs', `${user.id}.pdf`);
    await pdfService.generatePdf(user, pdfPath);

    await prisma.user.update({
      where: { id: user.id },
      data: { pdfPath },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserPdf,
  deleteUser,
  updateUser,
};
