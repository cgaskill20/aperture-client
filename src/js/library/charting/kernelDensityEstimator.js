
class KernelDensityEstimator {
    constructor() {
        // Default kernel is the epanechnikov kernel
        this.setKernel(this.epanechnikov);
        this.bandwidth = 0.4;
    }

    setKernel(kernel) {
        this.kernel = kernel;
    }

    setBandwidth(bw) {
        this.bandwidth = bw;
    }

    estimate(thresholds, data) {
        return thresholds.map(t => [t, d3.mean(data, d => this.kernel(this.bandwidth)(t - d))]);
    }

    normalize(estimate, upperBound) {
        let maxPoint = d3.max(estimate, d => d[1]);
        return estimate.map(p => [p[0], p[1] / maxPoint * upperBound]);
    }

    epanechnikov(bandwidth) {
        return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
    }
}
