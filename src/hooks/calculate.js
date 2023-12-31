export const calculateStarsRatio = (reviews) => {
    if (!reviews || reviews.length === 0) {
        return {
            '5-stars': 0,
            '4-stars': 0,
            '3-stars': 0,
            '2-stars': 0,
            '1-stars': 0,
        };
    }

    const totalReviews = reviews.length;
    const starsCount = {
        '5-stars': 0,
        '4-stars': 0,
        '3-stars': 0,
        '2-stars': 0,
        '1-stars': 0,
    };
    // Yıldız sayılarını hesapla
    reviews.forEach((review) => {
        const stars = Math.round(review.stars);
        starsCount[`${stars}-stars`] += 1;
    });

    // Oranları hesapla
    const starsRatio = {};
    for (const key in starsCount) {
        starsRatio[key] = (starsCount[key] / totalReviews) * 100;
    }

    return starsRatio;
};
