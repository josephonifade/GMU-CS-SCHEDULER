export interface Token { }
export interface Operator extends Token { }
export class AndOperator implements Operator {
    public proveAndOperator(): void { }
 }
export class OrOperator implements Operator { }
