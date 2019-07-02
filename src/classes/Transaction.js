export const aggregateData = (transactions) => {
    let map = new Map();
    transactions.forEach((t) => {
       let list = map.get(t.transaction_id);
       if (!list) {
           map.set(t.transaction_id, [t]);
       } else {
           list.push(t);
       }
    });

    let nestedTransactions = [];
    map.forEach((list) => {
        nestedTransactions.push(newTransaction(list));
    });
    return nestedTransactions;
};

const newTransaction = (lines) => {
    let qty = 0;
    let value = 0;
    let items = [];

    lines.forEach((line) => {
       qty = qty + line.qty;
       value = value + line.value;
       items.push(newLine(line.sku, line.brand, line.category, line.qty, line.value));
    });

    return {
        time: lines[0].time,
        transaction_id: lines[0].transaction_id,
        qty: qty,
        value: value,
        member_id: lines[0].member_id,
        lines: items
    }
};

const newLine = (sku, brand, category, qty, value) => {
    return {
        sku: sku,
        brand: brand,
        category: category,
        unit_value: value/qty,
        qty: qty,
        value: value
    }
};