import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { camelCase, isPlainObject, isArray } from 'lodash';

const camelCaseDeep = (obj: any): any => {
  if (isArray(obj)) {
    return obj.map(camelCaseDeep);
  }

  if (isPlainObject(obj)) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = camelCase(key);
      acc[camelKey] = camelCaseDeep(obj[key]);
      return acc;
    }, {} as any);
  }

  return obj;
};

@Injectable()
export class CamelCaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((data) => (data ? camelCaseDeep(data) : data)));
  }
}
