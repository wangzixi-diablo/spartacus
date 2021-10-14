import fs from 'fs';

export type CsvCellData = number | string | boolean;

/**
 * Saves data to CSV file.
 *
 * CAUTION: assumes the same order of object's keys in each passed data object.
 */
export class CsvFile {
  protected readonly filename;

  constructor({ filename }: { filename: string }) {
    this.filename = filename;
  }

  appendRow(data: Record<string, CsvCellData>) {
    this.createHeadersIfNeeded(Object.keys(data));
    this.appendToFile(Object.values(data));
  }

  private appendToFile(data: any[], shouldLog: boolean = true): void {
    const row = data.join(',') + '\n';
    setTimeout(() =>
      fs.appendFile(this.filename, row, (err) => {
        if (err) {
          throw err;
        }
        if (shouldLog) {
          console.log(`Appended a row to '${this.filename}'!`);
        }
      })
    );
  }

  private createHeadersIfNeeded(headers: any[]) {
    if (fs.existsSync(this.filename)) {
      return;
    }
    this.appendToFile(headers, false);
  }
}
