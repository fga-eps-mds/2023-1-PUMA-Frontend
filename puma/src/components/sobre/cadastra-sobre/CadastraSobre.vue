<template>
    <div class="main-content">
        <ReturnButton />

        <div class='title'>
            Sobre a PUMA
        </div>

        <div class="title sub-title mb-4">
            Preencha os campos abaixo adicionar informações referentes à PUMA, que poderão ser utilizados pelos usuários
            para visualizar informações da PUMA.
        </div>

        <ValidationObserver ref="observer" v-slot="{ handleSubmit }" @submit="handleSubmit(submitForm)">
            <div class="form m-0">
                <div class="form-col-1">

                    <ValidationProvider rules="required|min:100" v-slot="{ errors }">
                        <div role="group" class="group" style="width: 45%;">
                            <input v-model="titleDescription" type="text" placeholder="Tópico 1" class="input-textfield">
                        </div>
                        <div role="group" class="group">
                            <textarea id="description" class="input-textarea"
                                placeholder="Forneça o texto do Tópico 1 que será exibido no ambiente externo usando, no mínimo, 100 caracteres."
                                maxlength="1000" rows="10" v-model="description">
                            </textarea>
                            <span class="input-counter">({{ description.length }}/1000)</span>
                            <span class="input-error-span" v-if="errors.length">
                                {{ errors[0] }}
                            </span>
                        </div>
                    </ValidationProvider>

                    <ValidationProvider rules="required|min:100" v-slot="{ errors }">
                        <div role="group" class="group">
                            <div role="group" class="group" style="width: 45%;">
                                <input v-model="titleGoal" type="text" placeholder="Tópico 2" class="input-textfield">
                            </div>
                            <div class="goals">
                                <textarea id="goals" class="input-textarea"
                                    placeholder="Forneça o texto do Tópico 1 que será exibido no ambiente externo usando, no mínimo, 100 caracteres."
                                    maxlength="1000" rows="10" v-model="goals">
                                </textarea>
                                <span class="input-counter">({{ goals.length }}/1000)</span>
                                <span class="input-error-span" v-if="errors.length">
                                    {{ errors[0] }}
                                </span>
                            </div>
                        </div>
                    </ValidationProvider>

                    <ValidationProvider rules="required|min:100" v-slot="{ errors }">
                        <div role="group" class="group" style="width: 45%;">
                            <input v-model="titleMethodology" type="text" placeholder="Tópico 3" class="input-textfield">
                        </div>
                        <div role="group" class="group">
                            <textarea id="methodology" class="input-textarea"
                                placeholder="Forneça o texto do Tópico 1 que será exibido no ambiente externo usando, no mínimo, 100 caracteres."
                                maxlength="1000" rows="10" v-model="methodology">
                            </textarea>
                            <span class="input-counter">({{ methodology.length }}/1000)</span>
                            <span class="input-error-span" v-if="errors.length">
                                {{ errors[0] }}
                            </span>
                        </div>
                    </ValidationProvider>
                </div>
                <div class="form-col-2">
                    <div role="group" class="group">
                        <label class="input-label">Imagem tópico 1</label>
                        <div v-if="!!imageSelected3" class="image-input-container-selected"
                            v-bind:style="{ backgroundImage: `url(${imageSelected3})` }">
                            <label for="imagedes" class="image-input-label-selected">
                                <img class="image-input-icon" src="../../../assets/download-direto.png" alt="ícone">
                                <span>Escolha um arquivo <br>ou arraste ele aqui</span>
                            </label>
                            <input type="file" class="image-input" id="imagedes" name="imagedes" accept="image/*"
                                @input="e => handleDesImage(e.target)" :disabled=isLoading>
                        </div>
                        <div v-else class="image-input-container" v-bind:style="{ backgroundImage: `url(${imageSelected3})` }">
                            <label for="imagedes" class="image-input-label">
                                <img class="image-input-icon" src="../../../assets/download-direto.png" alt="ícone">
                                <span>Escolha um arquivo <br>ou arraste ele aqui</span>
                            </label>
                            <input type="file" class="image-input" id="imagedes" name="imagedes" accept="image/*"
                                @input="e => handleDesImage(e.target)" :disabled=isLoading>
                        </div>
                        <span class="input-error-span" v-if="imageError">
                            O tamanho da imagem deve ser menor que 2MB
                        </span>
                    </div>

                    <div role="group" class="group">
                        <label class="input-label">Imagem tópico 2</label>
                        <div v-if="!!imageSelected2" class="image-input-container-selected"
                            v-bind:style="{ backgroundImage: `url(${imageSelected2})` }">
                            <label for="imageobj" class="image-input-label-selected">
                                <img class="image-input-icon" src="../../../assets/download-direto.png" alt="ícone">
                                <span>Escolha um arquivo <br>ou arraste ele aqui</span>
                            </label>
                            <input type="file" class="image-input" id="imageobj" name="imageobj" accept="image/*"
                                @input="e => handleObjImage(e.target)" :disabled=isLoading>
                        </div>
                        <div v-else class="image-input-container"
                            v-bind:style="{ backgroundImage: `url(${imageSelected2})` }">
                            <label for="imageobj" class="image-input-label">
                                <img class="image-input-icon" src="../../../assets/download-direto.png" alt="ícone">
                                <span>Escolha um arquivo <br>ou arraste ele aqui</span>
                            </label>
                            <input type="file" class="image-input" id="imageobj" name="imageobj" accept="image/*"
                                @input="e => handleObjImage(e.target)" :disabled=isLoading>
                        </div>
                        <span class="input-error-span" v-if="imageError">
                            O tamanho da imagem deve ser menor que 2MB
                        </span>
                    </div>

                    <div role="group" class="group">
                        <label class="input-label">Imagem tópico 3</label>
                        <div v-if="!!imageSelected" class="image-input-container-selected"
                            v-bind:style="{ backgroundImage: `url(${imageSelected})` }">
                            <label for="image" class="image-input-label-selected">
                                <img class="image-input-icon" src="../../../assets/download-direto.png" alt="ícone">
                                <span>Escolha um arquivo <br>ou arraste ele aqui</span>
                            </label>
                            <input type="file" class="image-input" id="image" name="image" accept="image/*"
                                @input="e => handleMetImage(e.target)" :disabled=isLoading>
                        </div>
                        <div v-else class="image-input-container" v-bind:style="{ backgroundImage: `url(${imageSelected})` }">
                            <label for="image" class="image-input-label">
                                <img class="image-input-icon" src="../../../assets/download-direto.png" alt="ícone">
                                <span>Escolha um arquivo <br>ou arraste ele aqui</span>
                            </label>
                            <input type="file" class="image-input" id="image" name="image" accept="image/*"
                                @input="e => handleMetImage(e.target)" :disabled=isLoading>
                        </div>
                        <span class="input-error-span" v-if="imageError">
                            O tamanho da imagem deve ser menor que 2MB
                        </span>
                    </div>
                </div>

                <div class="form-col-3">
                    <div role="group" class="group">
                        <div class="label-flex-box">
                            <div role="group" class="group" style="width: 45%;">
                                <input v-model="titleTeachers" type="text" placeholder="Idealizadores" class="input-textfield">
                            </div>
                        </div>
                        <multiselect id="professor" v-model="professorsSelected[0]" :options="professors" track-by="userId"
                            label="fullName" :multiple="true" open-direction="bottom"
                            :placeholder="multiSelectPlaceholderProfessor" :searchable="true" :show-labels="true"
                            :close-on-select="false" :max-height="150" @input="sortProfessorMultiselectLabels()"
                            select-label="" deselect-label="" selected-label="" @open="multiSelectPlaceholder = 'Pesquisar'"
                            :loading="isLoadingProfessors"
                            @close="isTouchedProfessors = true; multiSelectPlaceholder = 'Selecione'"
                            class="input-multiselect" :disabled="isLoadingProfessors || !professors.length"
                            :class="(isTouchedProfessors && !professorsSelected.length) ? 'input-multiselect-error' : 'input-multiselect-focus'">
                            <template slot="option" slot-scope="scope">
                                <div class="option__desc">
                                    <input class="mx-2" type="checkbox" :checked="isProfessorChecked(scope.option)"
                                        @focus.prevent :key="scope.option.userId" />
                                    <span class="option__title">{{ scope.option.fullName }}</span>
                                </div>
                            </template>
                            <span slot="noResult">
                                Nenhum idealizador encontrado.
                            </span>
                        </multiselect>
                        <span v-if="isTouchedProfessors && !professorsSelected.length" class="input-error-span">
                            Escolha no mínimo um professor
                        </span>
                    </div>
                </div>
            </div>
            <div class="div-buttons">
                <input :value="'Editar'" type="submit" class="cadastro-button" @click="onSubmit" />

                <input :value="'Voltar'" type="submit" class="cadastro-button cadastro-button-voltar"
                    @click="$router.push({ path: '/sobre' }).catch(() => { })" />
            </div>
        </ValidationObserver>
    </div>
</template>
<script src="./cadastra-sobre.js"></script>

<style src="./cadastra-sobre.css" scoped></style>

<style src="@/assets/css/input.css" scoped></style>
