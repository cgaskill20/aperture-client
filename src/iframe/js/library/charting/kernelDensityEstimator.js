
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

    epanechnikov(bandwidth) {
        return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
    }
}
