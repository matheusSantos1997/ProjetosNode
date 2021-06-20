import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('settings')
class Setting {
    
    // annotations
    @PrimaryColumn()
    id: string;
    
    @Column()
    username: string;
    
    @Column()
    chat: boolean;
    
    @UpdateDateColumn()
    updated_at: Date;
    
    @CreateDateColumn()
    created_at: Date;

    constructor() {
       // verificando se o id está preenchido
       if (!this.id) {
           this.id = uuid();
       }
    }

}

export { Setting }