import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import { map } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) { }

    urlApp = environment.urlApi + '/stations'

  getStations() {
    return this.http.get(this.urlApp).pipe(
      map((data: any) => {
        return data
      })
    );
  }


    exporterPdf(stationName: string, startDate: string | null, endDate: string | null, polluant:string, metrique: string) {
        const url = `${environment.urlApi}/export-to-pdf/${stationName}?dateDebut=${startDate ?? ''}&dateFin=${endDate ?? ''}&polluant=${polluant}&metrique=${metrique}`;
        this.http.get(url, { responseType: 'blob', observe: 'events' }).subscribe(event => {
            if (event.type === HttpEventType.Response) {
                const response = event as HttpResponse<Blob>;
                const contentDispositionHeader = response.headers.get('Content-Disposition');
                const parts = contentDispositionHeader?.split(';') ?? [];
                const filenamePart = parts.find(part => part.trim().startsWith('filename=')) ?? '';
                const filename = filenamePart.split('=')[1]?.trim().replace(/"/g, '') ?? `${stationName}-${startDate}-${endDate}.pdf`;
                saveAs(response.body as any, filename);
            }
        });
    }

}
