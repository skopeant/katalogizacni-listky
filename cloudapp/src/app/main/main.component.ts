import { Component } from '@angular/core';
import { CloudAppRestService } from '@exlibris/exl-cloudapp-angular-lib';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

interface BibApiResponse {
  mms_id?: string;
  title?: string;
  author?: string;
  record_format?: string;
  anies?: string[] | string;
}

interface Subfield {
  code: string;
  value: string;
}

interface MarcDataField {
  tag: string;
  ind1: string;
  ind2: string;
  subfields: Subfield[];
}

interface CatalogCard {
  mmsId: string;
  author: string;
  description: string;
  genre: string;
  subjects: string[];
  error?: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  loading = false;
  error = '';
  cards: CatalogCard[] = [];

  constructor(
    private restService: CloudAppRestService,
    private translate: TranslateService
  ) {}

  load(mmsText: string): void {
    this.error = '';
    this.cards = [];

    const ids = this.parseIds(mmsText);

    if (!ids.length) {
      this.error = this.t('Errors.AtLeastOne');
      return;
    }

    if (ids.length > 100) {
      this.error = this.t('Errors.Max100');
      return;
    }

    const invalid = ids.filter(id => !/^\d+$/.test(id));
    if (invalid.length) {
      this.error = this.t('Errors.DigitsOnly', { values: invalid.join(', ') });
      return;
    }

    this.loading = true;

    const requests = ids.map(id =>
      this.restService
        .call<BibApiResponse>(`/bibs/${encodeURIComponent(id)}`)
        .pipe(
          map(bib => this.createCard(id, bib)),
          catchError(err => of(this.createErrorCard(id, err)))
        )
    );

    forkJoin(requests)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: cards => this.cards = cards,
        error: err => this.error = this.getErrorMessage(err)
      });
  }

  printCards(): void {
    const printable = this.cards.filter(card => !card.error);
    if (!printable.length) {
      this.error = this.t('Errors.NothingToPrint');
      return;
    }

    const w = window.open('', '_blank');
    if (!w) {
      this.error = this.t('Errors.PopupBlocked');
      return;
    }

    const cardsHtml = printable.map((card, index) => `
      <section class="catalog-card ${index > 0 && index % 3 === 0 ? 'page-break-before' : ''}">
        <div class="card-author">${this.escapeHtml(card.author)}</div>

        <div class="card-meta">
          <span class="genre">${this.escapeHtml(card.genre)}</span>
          <span class="sep">_</span>
          <span class="mms">${this.escapeHtml(card.mmsId)}</span>
        </div>

        <div class="description">${this.escapeHtml(card.description)}</div>

        <div class="subjects">
          ${card.subjects.map(s => `<div>${this.escapeHtml(s)}</div>`).join('')}
        </div>
      </section>
    `).join('');

    w.document.open();
    w.document.write(`<!doctype html>
<html lang="${this.escapeHtml(this.lang())}">
<head>
<meta charset="utf-8">
<title>${this.escapeHtml(this.t('Print.Title'))}</title>
<style>
  @page {
    size: A4 portrait;
    margin: 12mm 0 10mm 0;
  }

  * { box-sizing: border-box; }

  html, body {
    margin: 0;
    padding: 0;
    background: #fff;
    color: #000;
    font-family: "Times New Roman", Times, serif;
  }

  .sheet { width: 100%; }

  .catalog-card {
    position: relative;
    width: 140mm;
    height: 88mm;
    margin: 0 auto;
    border: 0.25mm solid #000;
    padding: 11mm 11mm 8mm 11mm;
    overflow: hidden;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .catalog-card + .catalog-card {
    border-top: 0;
  }

  .page-break-before {
    break-before: page;
    page-break-before: always;
    border-top: 0.25mm solid #000 !important;
  }

  .card-author {
    font-family: "Courier New", Courier, monospace;
    font-size: 15pt;
    line-height: 1.05;
    font-weight: 700;
    text-transform: uppercase;
    padding-right: 8mm;
  }

  .card-meta {
    margin-top: 2mm;
    padding-right: 2mm;
    text-align: right;
    font-family: "Courier New", Courier, monospace;
    font-size: 8.5pt;
    letter-spacing: 0.35mm;
    white-space: nowrap;
  }

  .card-meta .genre { text-transform: uppercase; }

  .card-meta .sep {
    display: inline-block;
    margin: 0 2mm;
  }

  .description {
    margin-top: 6.5mm;
    font-size: 10.2pt;
    line-height: 1.15;
  }

  .subjects {
    position: absolute;
    left: 11mm;
    right: 11mm;
    bottom: 8mm;
    display: block;
    font-size: 9.7pt;
    line-height: 1.05;
    text-transform: uppercase;
  }

  .subjects > div + div {
    margin-top: 0.8mm;
  }

  .screen-only { margin: 8px auto 16px; width: 140mm; text-align: right; }
  .screen-only button { font: 14px Arial, Helvetica, sans-serif; padding: 7px 14px; }

  @media screen {
    body { padding: 12mm 0; }
  }

  @media print {
    body { padding: 0; }
    .screen-only { display: none; }
  }
</style>
</head>
<body>
<div class="screen-only"><button id="print-button" type="button">${this.escapeHtml(this.t('Print.PrintButton'))}</button></div>
<div class="sheet">${cardsHtml}</div>
</body>
</html>`);
    w.document.close();

    const printButton = w.document.getElementById('print-button');
    if (printButton) {
      printButton.addEventListener('click', () => {
        w.focus();
        w.print();
      });
    }

    setTimeout(() => w.focus(), 150);
  }

  private parseIds(text: string): string[] {
    const ids = text
      .split(/[\s,;]+/)
      .map(v => v.trim())
      .filter(Boolean);

    return Array.from(new Set(ids));
  }

  private createCard(requestedMmsId: string, bib: BibApiResponse): CatalogCard {
    const xml = this.getMarcXml(bib);

    if (!xml) {
      return {
        mmsId: bib.mms_id || requestedMmsId,
        author: '',
        description: '',
        genre: '',
        subjects: [],
        error: this.t('Errors.MarcMissing')
      };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');

    if (doc.getElementsByTagName('parsererror').length) {
      return {
        mmsId: bib.mms_id || requestedMmsId,
        author: '',
        description: '',
        genre: '',
        subjects: [],
        error: this.t('Errors.MarcParse')
      };
    }

    const fields = this.getDataFields(doc);

    return {
      mmsId: bib.mms_id || requestedMmsId,
      author: this.buildAuthor(fields, bib.author || ''),
      description: this.buildDescription(fields, bib.title || ''),
      genre: this.buildGenre(fields),
      subjects: this.buildSubjects(fields)
    };
  }

  private getMarcXml(bib: BibApiResponse): string {
    if (typeof bib.anies === 'string') return bib.anies;

    if (Array.isArray(bib.anies) && bib.anies.length && typeof bib.anies[0] === 'string') {
      return bib.anies[0];
    }

    return '';
  }

  private getDataFields(doc: Document): MarcDataField[] {
    let nodes = Array.from(doc.getElementsByTagNameNS('*', 'datafield'));
    if (!nodes.length) {
      nodes = Array.from(doc.getElementsByTagName('datafield'));
    }

    return nodes.map(node => {
      let subs = Array.from(node.getElementsByTagNameNS('*', 'subfield'));
      if (!subs.length) {
        subs = Array.from(node.getElementsByTagName('subfield'));
      }

      return {
        tag: node.getAttribute('tag') || '',
        ind1: node.getAttribute('ind1') || ' ',
        ind2: node.getAttribute('ind2') || ' ',
        subfields: subs.map(s => ({
          code: s.getAttribute('code') || '',
          value: (s.textContent || '').trim()
        }))
      };
    });
  }

  private fields(fields: MarcDataField[], tag: string): MarcDataField[] {
    return fields.filter(f => f.tag === tag);
  }

  private firstSubfield(field: MarcDataField | undefined, code: string): string {
    return field?.subfields.find(s => s.code === code)?.value || '';
  }

  private joinSubfields(field: MarcDataField | undefined, codes?: string[]): string {
    if (!field) return '';

    return field.subfields
      .filter(s => !codes || codes.includes(s.code))
      .map(s => s.value)
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private buildAuthor(fields: MarcDataField[], apiAuthor: string): string {
    const f100 = this.fields(fields, '100')[0];

    let author = f100
      ? this.joinSubfields(f100, ['a', 'b', 'c', 'd'])
      : apiAuthor;

    author = author.replace(/\s*[,;:/]\s*$/, '').trim();

    return author.toUpperCase();
  }

  private buildDescription(fields: MarcDataField[], apiTitle: string): string {
    const parts: string[] = [];

    const f245 = this.fields(fields, '245')[0];
    const title = this.cleanSpacing(
      f245 ? this.joinSubfields(f245, ['a', 'b', 'c', 'n', 'p']) : apiTitle
    );
    if (title) parts.push(title);

    const f250 = this.fields(fields, '250')[0];
    const edition = this.cleanSpacing(this.joinSubfields(f250));
    if (edition) parts.push(edition);

    const publication = this.selectPublicationField(fields);
    const publicationText = this.cleanSpacing(
      this.joinSubfields(publication, ['a', 'b', 'c'])
    );
    if (publicationText) parts.push(publicationText);

    const f300 = this.fields(fields, '300')[0];
    const physical = this.cleanSpacing(
      this.joinSubfields(f300, ['a', 'b', 'c', 'e'])
    );
    if (physical) parts.push(physical);

    if (!parts.length) return '';

    return parts
      .map(p => this.stripFinalPunctuation(p))
      .filter(Boolean)
      .join('. - ') + '.';
  }

  private selectPublicationField(fields: MarcDataField[]): MarcDataField | undefined {
    const f264 = this.fields(fields, '264');

    if (f264.length) {
      return f264.find(f => f.ind2 === '1') || f264[0];
    }

    return this.fields(fields, '260')[0];
  }

  private buildSubjects(fields: MarcDataField[]): string[] {
    const all650 = this.fields(fields, '650');

    const czenas = all650.filter(f =>
      f.subfields.some(s => s.code === '2' && s.value.toLowerCase() === 'czenas')
    );

    const selected = czenas.length ? czenas : all650;

    return selected
      .map(f => this.firstSubfield(f, 'a'))
      .filter(Boolean)
      .map(v => this.stripFinalPunctuation(v).toUpperCase());
  }

  private buildGenre(fields: MarcDataField[]): string {
    const all655 = this.fields(fields, '655');
    if (!all655.length) return '';

    const czenas = all655.filter(f =>
      f.subfields.some(s => s.code === '2' && s.value.toLowerCase() === 'czenas')
    );

    const selected = czenas.length ? czenas : all655;
    const value = this.firstSubfield(selected[selected.length - 1], 'a');

    return this.stripFinalPunctuation(value).toUpperCase();
  }

  private cleanSpacing(value: string): string {
    return value
      .replace(/\s+/g, ' ')
      .replace(/\s+([,.;:\/])/g, ' $1')
      .trim();
  }

  private stripFinalPunctuation(value: string): string {
    return value.replace(/[\s.,;:/]+$/, '').trim();
  }

  private createErrorCard(mmsId: string, err: any): CatalogCard {
    return {
      mmsId,
      author: '',
      description: '',
      genre: '',
      subjects: [],
      error: this.getErrorMessage(err)
    };
  }

  private getErrorMessage(err: any): string {
    if (!err) return this.t('Errors.Unknown');

    if (err.error?.errorList?.error?.[0]?.errorMessage) {
      return err.error.errorList.error[0].errorMessage;
    }

    if (err.message) return err.message;
    if (err.status) return this.t('Errors.Http', { status: err.status });

    return String(err);
  }

  private lang(): string {
    return String(this.translate.currentLang || this.translate.defaultLang || 'en')
      .toLowerCase()
      .split('-')[0];
  }

  private t(key: string, params?: Record<string, any>): string {
    return this.translate.instant(key, params);
  }

  private escapeHtml(value: string): string {
    return (value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
