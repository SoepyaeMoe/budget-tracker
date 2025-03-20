import Expense from "../Models/expense.model.js";

const addExpense = async (req, res) => {
    try {
        const { amount, description, category, date } = req.body;

        if (!amount || !category || !date) {
            return res.status(400).json({ error: "Please provide in amount, category and date fields." });
        }

        const newExpense = new Expense({
            userId: req.user._id,
            amount,
            description,
            category,
            date
        });

        await newExpense.save();
        res.status(201).json({ newExpense });

    } catch (error) {
        console.log(`Error in add expense ${error.message}`);
        return res.status(500).json({ error: "Internal server error." });
    }
}

const getExpenses = async (req, res) => {
    try {
        const search = req.query.search ? req.query.search : '';
        const monthInput = req.query.month ? req.query.month : '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const query = { userId: req.user._id };

        if (search) {
            query.$or = [
                { category: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        if (monthInput) {
            const [year, month] = monthInput.split('-');
            query.$expr = {
                $and: [
                    { $eq: [{ $month: '$date' }, parseInt(month)] },
                    { $eq: [{ $year: '$date' }, parseInt(year)] }
                ]
            };
        }

        const expenses = await Expense.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalExpenses = await Expense.countDocuments(query);

        res.status(200).json({ expenses, totalPages: Math.ceil(totalExpenses / limit), currentPage: page });
    } catch (error) {
        console.log(`Error in get expenses ${error.message}`);
        return res.status(500).json({ error: "Internal server error." });
    }
}

const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findById(id);

        if (!expense) {
            return res.status(404).json({ error: "Unknown data." });
        }

        if (expense.userId.toString() !== req.user._id.toString()) {
            return res.status(400).json({ error: "Unauthorized." });
        }

        const { amount, category, date, description } = req.body;

        if (!amount || !category || !date) {
            return res.status(400).json({ error: "Please provide in amount, category and date fields." });
        }

        expense.amount = amount;
        expense.category = category;
        expense.description = description;
        expense.date = date;
        await expense.save();
        res.status(200).json({ expense });

    } catch (error) {
        console.log(`Error in update expense ${error.message}`);
        return res.status(500).json({ error: "Internal server error." });
    }
}

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findById(id);

        if (!expense) {
            return res.status(404).json({ error: "Unknown data." });
        }

        if (expense.userId.toString() !== req.user._id.toString()) {
            return res.status(400).json({ error: "Unauthorized." });
        }

        await Expense.findByIdAndDelete(id);
        res.status(200).json({ message: "Expense deleted successfully." });

    } catch (error) {
        console.log(`Error in delete expense ${error.message}`);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export { addExpense, getExpenses, updateExpense, deleteExpense };