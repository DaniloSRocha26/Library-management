//Standard response object for Library operations 
export interface OperationResult {
    //Indicate if the operation was completed successfully
    success: boolean

    //Descriptive message about the outcome (error reason or success confirmation).
    message: string
}
