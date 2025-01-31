const sessionController = {
  resetSession: async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Failed to reset game session',
            error: err.message,
          });
        }
        res.status(200).json({});
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error while resetting game session',
        error: error.message,
      });
    }
  },
};

module.exports = sessionController;
