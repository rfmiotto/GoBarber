import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
