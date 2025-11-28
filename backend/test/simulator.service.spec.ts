import { SimulatorService } from '../src/simulator.service';

describe('SimulatorService', () => {
  it('should compute estimation with import fees', () => {
    const service = new SimulatorService();
    const result = service.estimate({ region: 'idf', puissance: 7, co2: 120, importType: 'ue' });
    expect(result.total).toBeGreaterThan(0);
    expect(result.breakdown.fraisImport).toBe(45);
  });
});
