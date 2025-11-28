import { TaxCalculatorService } from './tax-calculator.service';
import { CalculateTaxDto, TaxCalculationResult } from './dto/tax-calculator.dto';
export declare class TaxCalculatorController {
    private taxCalculatorService;
    constructor(taxCalculatorService: TaxCalculatorService);
    calculateTax(dto: CalculateTaxDto): Promise<TaxCalculationResult>;
    getDepartments(): Promise<{
        code: string;
        name: string;
        ratePerHp: number;
        exonerationClean: boolean;
    }[]>;
    getEcoMalusThresholds(): Promise<{
        min: number;
        max: number | null;
        amount: number;
    }[]>;
}
