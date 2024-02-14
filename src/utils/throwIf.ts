const throwIf = (condition: any, error: any) => {
    if (condition) {
        throw error;
    }
}

export default throwIf