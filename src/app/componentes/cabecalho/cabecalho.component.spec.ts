import { ComponentFixture, TestBed } from "@Angular/core/testing";
import { CabecalhoComponent } from "./cabecalho.component"

describe('CabecalhoComponent', () => {
    let component: CabecalhoComponent;
    let fixture: ComponentFixture<CabecalhoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
           imports: [CabecalhoComponent]
        });
        fixture = TestBed.createComponent(CabecalhoComponent);
        component = fixture.componentInstance;
    });

    it('deveria ser criado', () => {
        expect(component).toBeTruthy();
    });

    it('deveria definir as propriedades alt e src', () => {
        expect(component.alt).toBeDefined();
        expect(component.src).toBeDefined();
    });

    it('deveria renderizar o conteúdo baseado nas propriedades alt e src', () => {
        component.src = 'https://example.com/test-image.jpg';
        component.alt = 'Imagem teste';
        expect(component).toMatchSnapshot();
    })
})