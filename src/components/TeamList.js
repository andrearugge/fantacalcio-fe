exports.getAllTeams = async (req, res) => {
    try {
      const teams = await Team.find();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.updateTeam = async (req, res) => {
    try {
      const { name, budget } = req.body;
      const team = await Team.findByIdAndUpdate(
        req.params.id, 
        { name, budget }, 
        { new: true, runValidators: true }
      );
      if (!team) {
        return res.status(404).json({ message: 'Squadra non trovata' });
      }
      res.json(team);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.deleteTeam = async (req, res) => {
    try {
      const team = await Team.findByIdAndDelete(req.params.id);
      if (!team) {
        return res.status(404).json({ message: 'Squadra non trovata' });
      }
      res.json({ message: 'Squadra eliminata con successo' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };