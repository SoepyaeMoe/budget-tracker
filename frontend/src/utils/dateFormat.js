const dateFormat = (date) => new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

export default dateFormat;