describe('lets go!!!!', () => {
  it('should get the proper num of class', async () => {
    class ClassCal {
      boy: number;
      girl: number;

      constructor(boy: number, girl: number) {
        this.boy = boy;
        this.girl = girl;
      }

      classNum(boy: number, girl: number): number {
        return this.boy + this.girl;
      }
    }

    const myClass = new ClassCal(30, 15);

    const result = myClass.classNum(myClass.boy, myClass.girl);
    expect(result).toBe(45);
  });
});
