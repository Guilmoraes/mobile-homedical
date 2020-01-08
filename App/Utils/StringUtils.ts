class StringUtils {

  removeSpecialCharacters(text: string) {
    return text.replace(/[^a-zA-Z0-9]/g, '');
  }

  isEmpty(text?: string){
    return (text === undefined || text === null || text.length === 0);
  }

  isNotEmpty(text?: string){
    return (text != null && text.length > 0 && text !== '');
  }

  integerTwoDigits(number: number): string{
    return (number < 10 ? '0' : '') + number
  }

}

export default new StringUtils();
