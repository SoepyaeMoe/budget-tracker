import Income from '../Models/income.model.js';

const addIncome = async (req, res) => {
    try {
        const { amount, description, category, date } = req.body;

        if (!amount || !category || !date) {
            return res.status(400).json({ error: "Please provide in amount, category and date fields." });
        }

        const newIncome = new Income({
            userId: req.user._id,
            amount,
            description,
            category,
            date
        });

        await newIncome.save();
        res.status(201).json({ newIncome });

    } catch (error) {
        console.log(`Error in add income ${error.message}`);
        return res.status(500).json({ error: "Internal server error." });
    }
}

const getIncomes = async (req, res) => {
    try {
        const search = req.query.search && req.query.search != 'undefined' ? req.query.search : '';
        const monthInput = req.query.month && req.query.month != 'undefined' ? req.query.month : '';
        const startDate = req.query.startDate && req.query.startDate != 'undefined' ? req.query.startDate : '';
        const endDate = req.query.endDate && req.query.endDate != 'undefined' ? req.query.endDate : '';
        const page = parseInt(req.query.page) || 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : Infinity;

        const query = { userId: req.user._id };

        if (search) {
            query.$or = [
                { category: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ]
        }

        if (monthInput) {
            const [year, month] = monthInput.split('-');
            query.$expr = {
                $and: [
                    { $eq: [{ $month: '$date' }, parseInt(month)] },
                    { $eq: [{ $year: '$date' }, parseInt(year)] }
                ]
            }
        }

        if (startDate && endDate) {
            query.$expr = {
                $and: [
                    { $gte: ['$date', new Date(startDate)] },
                    { $lte: ['$date', new Date(endDate)] }
                ]
            }
        }

        const incomes = await Income.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalIncomes = await Income.countDocuments(query);

        res.status(200).json({ incomes, totalPages: Math.ceil(totalIncomes / limit), currentPage: page });
    } catch (error) {
        console.log(`Error in get income ${error.message}`);
        return res.status(500).json({ error: "Internal server error." });
    }
}

const updateIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const income = await Income.findById(id);

        if (!income) {
            return res.status(404).json({ error: "Unknown data." });
        }

        if (income.userId.toString() !== req.user._id.toString()) {
            return res.status(400).json({ error: "Unauthorized." });
        }

        const { amount, category, date, description } = req.body;

        if (!amount || !category || !date) {
            return res.status(400).json({ error: "Please provide in amount, category and date fields." });
        }

        income.amount = amount;
        income.category = category;
        income.description = description;
        income.date = date;
        await income.save();
        res.status(200).json({ income });

    } catch (error) {
        console.log(`Error in update income ${error.message}`);
        return res.status(500).json({ error: "Internal server error." });
    }
}

const deleteIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const income = await Income.findById(id);

        if (!income) {
            return res.status(404).json({ error: "Unknown data." });
        }

        if (income.userId.toString() !== req.user._id.toString()) {
            return res.status(400).json({ error: "Unauthorized." });
        }

        await Income.findByIdAndDelete(id);
        res.status(200).json({ message: "Income deleted successfully." });

    } catch (error) {
        console.log(`Error in delete income ${error.message}`);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export { addIncome, getIncomes, updateIncome, deleteIncome };