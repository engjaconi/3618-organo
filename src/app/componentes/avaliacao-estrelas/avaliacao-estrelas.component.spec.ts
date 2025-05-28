import {TestBed,ComponentFixture }from '@angular/core/testing';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { AvaliacaoEstrelasComponent } from "./avaliacao-estrelas.component"
import { forwardRef } from "@angular/core";

describe('AvaliacaoEstrelasComponent', () => {
    let component: AvaliacaoEstrelasComponent;
    let fixture: ComponentFixture<AvaliacaoEstrelasComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AvaliacaoEstrelasComponent],
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => AvaliacaoEstrelasComponent),
                    multi: true
                }
            ]
        });

        fixture = TestBed.createComponent(AvaliacaoEstrelasComponent);
        component = fixture.componentInstance;
        component.readOnly = false;
    });

    it('deveria ser criado',  () => {
        expect(component).toBeTruthy();
    });

    it('deveria atribuir um valor para a classificação quando o método writeValue for chamado', () => {
        const classificação = 3;
        component.writeValue(classificação);
        expect(component.classificacao).toBe(classificação);
    });

    it('deveria chamar o onChange quando o método classificar for chamado', () => {
        const onChangeSpy = jest.spyOn(component, 'onChange');
        const classificacao = 4;
        component.classificar(classificacao);
        expect(onChangeSpy).toHaveBeenCalled();
    });

    it('deveria chamar o onTouched quando o método classificar for chamado', () => {
        const onTouchedSpy = jest.spyOn(component, 'onTouched');
        const classificacao = 4;
        component.classificar(classificacao);
        expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('não deveria atualizar a classificação quando a propriedade readonly for true', () => {
        const onChangeSpy = jest.spyOn(component, 'onChange');
        component.readOnly = true;
        const classificacao = 4;
        component.classificar(classificacao);
        expect(onChangeSpy).not.toHaveBeenCalled();
        expect(component.classificacao).not.toBe(classificacao);
    });

    it('deveria ignorar valores inválidos e atribuir o valor 1 à classificação', () => {
        const valoresInvalidos = [-6, 0, 'abc', undefined, null];
        valoresInvalidos.forEach(valorInvalido => {
            component.writeValue(valorInvalido as any);
            expect(component.classificacao).toBe(1);
        });
    });

    it('deveria atualizar o DOM quando a classificação muda', () => {
        const classificacao = 3;
        component.classificar(classificacao);
        fixture.detectChanges();
        const estrelaPreenchida = fixture.nativeElement.querySelector('.filled');
        expect(estrelaPreenchida).toBeTruthy();
    });

    it('deve inicializar com a classificação padrão de 1', () => {
        expect(component.classificacao).toBe(1);
    });

    it('deve atualizar a classificação quando o @Input mudar', () => {
        component.classificacao = 3;
        fixture.detectChanges();
        expect(component.classificacao).toBe(3);

        component.classificacao = 5;
        fixture.detectChanges();
        expect(component.classificacao).toBe(5);
    });

})