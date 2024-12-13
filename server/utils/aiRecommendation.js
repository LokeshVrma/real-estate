const tf = require('@tensorflow/tfjs');

/**
 * Generate recommendations using collaborative filtering.
 * @param {Array} interactionMatrix - 2D array where rows are users, columns are properties.
 * @param {Number} userId - ID of the user for whom to recommend.
 * @returns {Array} - Recommended property indices.
 */
const recommendProperties = (interactionMatrix, userId) => {
    const matrix = tf.tensor2d(interactionMatrix);

    // Factorize the matrix into user and property embeddings
    const [userFactors, propertyFactors] = tf.linalg.svd(matrix, true);

    // Get the user's preferences vector
    const userVector = userFactors.slice([userId, 0], [1, -1]);

    // Compute scores for all properties
    const scores = tf.matMul(userVector, propertyFactors, false, true).flatten();

    // Get property indices sorted by score
    const indices = scores.arraySync()
        .map((score, index) => ({ index, score }))
        .sort((a, b) => b.score - a.score)
        .map((item) => item.index);

    return indices;
};

module.exports = { recommendProperties };
