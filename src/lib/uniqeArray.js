export const uniqueArrayReturnIdAndName =(array)=>{
    const uniqueCategoryNames = new Set();
    const categoriesFilter = array
        .filter(category => {
            const categoryName = category.name;
            if (uniqueCategoryNames.has(categoryName)) {
                return false;
            }
            uniqueCategoryNames.add(categoryName);
            return true;
        })
        .map(category => ({ name: category.name, guid: category.guid }));

    return categoriesFilter
}
