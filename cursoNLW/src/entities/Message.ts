import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { v4 as uuid } from 'uuid';
import { User } from "./User";

@Entity('messages')
class Message {
    
    @PrimaryColumn()
    id: string;
    
    @Column()
    admin_id: string;
    
    @Column()
    text: string;
    
    @JoinColumn({name: 'user_id'}) // nome da coluna na qual vai fazer junçao
    @ManyToOne(() => User) // N:1
    user: User;
    
    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Message }