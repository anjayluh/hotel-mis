import { 
  printDateTime, printBirthday, printMonth, printDay, printShortDate, 
  printDayOfMonth, printDate, printStdDate, printStdDatetime, strToDate, 
  printMonthYear, printYearDateTime
} from './dateHelpers'

const currentDate = '2020-08-30T13:11:21.0060247';

describe('Date helpers', ()=> {
  test('Current date should a string', () => {
    expect(currentDate).toBeTruthy();
  })
  it('Should print date and time', () => {
    expect(printDateTime(currentDate)).toEqual('30.08.2020 13:11');
  });
  it('Should print birthday(day month)', () => {
    expect(printBirthday(currentDate)).toEqual('30 Aug');
  });
  it('Should print month', () => {
    expect(printMonth(currentDate)).toEqual('Aug');
  });
  it('Should print day(30th)', ()=> {
    expect(printDay(currentDate)).toEqual('30');
  });
  it('Should print a short date', ()=> {
    expect(printShortDate(currentDate)).toEqual('30 Aug')
  });
  it('Should print day of month', () => {
    expect(printDayOfMonth(currentDate)).toEqual('30')
  });
  it('Should print date', ()=> {
    expect(printDate(currentDate)).toEqual('30.08.2020')
  });
  it('Should print standard date', ()=> {
    expect(printStdDate(currentDate)).toEqual('30.08.2020')
  });
  it('Should print standard date and time', ()=> {
    expect(printStdDatetime(currentDate)).toEqual('30.08.2020')
  });
  it('Should convert string to date', ()=> {
    const currentDate = '2020-04-03';
    expect(strToDate(currentDate)).toEqual(new Date("2020-04-02T22:00:00.000Z"))
  });
  it('Should print month and year', ()=> {
    expect(printMonthYear(currentDate)).toEqual('August, 2020')
  });
  it('Should print year, date and time', ()=> {
    expect(printYearDateTime(currentDate)).toEqual('August, 2020')
  });

})