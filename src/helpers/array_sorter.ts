export class ArraySorterHelper {
  static sortArrayByID(array: Array<{ id: number }>): Array<{ id: number }> {
    return array.sort((a, b) => a.id - b.id);
  }
}
