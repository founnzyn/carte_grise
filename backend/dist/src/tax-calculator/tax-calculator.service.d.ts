import { PrismaService } from '../prisma/prisma.service';
import { CalculateTaxDto, TaxCalculationResult } from './dto/tax-calculator.dto';
export declare class TaxCalculatorService {
    private prisma;
    constructor(prisma: PrismaService);
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
